# Project Archive Overview

The Project Archive centralizes project information—briefs, quotes, invoices, contracts, SOPs, drawings, photos, messages, approvals, and final deliverables—while preserving a versioned audit trail.

## Key Features
- **Single source of truth:** store all project artifacts with file versioning and immutable activity logs.
- **Client portal:** allow clients to view progress, timelines, approvals, and downloads without relying on chat apps.
- **Internal operations hub:** manage tasks with Kanban or timeline views, templates, and SOP checklists.
- **Knowledge base & showcase:** tag projects to generate public case studies for marketing and SEO.
- **Compliance & warranty tracking:** keep permits, safety checks, and warranty dates with automated reminders.
- **Quote → execution → handover flow:** convert leads to projects, track cost/time, and generate a handover pack.
- **Media vault:** curate licensed photos and videos with usage rights and one-click social post generation.
- **Investor transparency:** share read-only archives of updates and reports.

## Beneficiaries
- **Management:** portfolio view of margins, risk, and overdue tasks.
- **Team members:** clear task lists with up-to-date specs and drawings.
- **Clients:** real-time status tracking and approvals in one place.
- **Sales & marketing:** instant case studies and reusable content.
- **Finance & compliance:** invoice attachments, budget snapshots, audit logs, and warranty reminders.

## Minimal Feature Set
- Role-based auth (admin, manager, staff, client).
- Projects table with status, tags, owner, and client.
- File storage with versioning.
- Notes/comments with @mentions.
- Tasks with assignees and due dates.
- Activity log for inserts, updates, and deletes.
- Optional public case study toggle.

### v1 Enhancements
- Project templates (blueprints).
- Approvals with sign-off steps.
- PDF handover pack generator.
- Service/warranty module with reminders.
- Granular client portal permissions.
- Search across titles, tags, and file names.

## Suggested Data Model
```
projects(id, title, client_id, owner_id, status, tags, budget, start_at, due_at, is_public)
project_members(project_id, user_id, role)
tasks(id, project_id, title, assignee_id, status, priority, due_at)
files(id, project_id, path, size, version, kind, visibility)
notes(id, project_id, author_id, body, mentions[])
approvals(id, project_id, step, approver_id, status, signed_at)
warranties(id, project_id, item, starts_at, ends_at, service_interval_days)
activity_log(id, project_id, actor_id, action, payload jsonb, created_at)
```
Row Level Security:
- Clients: read only their projects.
- Staff: read/write assigned projects.
- Managers/Admin: full access.

## UI Layout (Next.js)
- `/` portfolio grid with status, tag, client, and date filters.
- `/projects/[id]` overview with tabs for Files, Tasks, Notes, Approvals, Handover, and Activity.
- `/clients/[id]` client profile and associated projects.
- `/admin/reports` KPIs like on-time %, margin, WIP count, service due soon.
- Public `/case-studies/[slug]` generated from approved archives.

## Integrations
- Email notifications (e.g., Nodemailer or Resend) for approvals and handover packs.
- iCal feeds for project deadlines and service visits.
- Maps for project locations and field team directions.
- Basic analytics and activity heatmaps.
- Telegram bot for team notifications (deferred).

## Ops & Hosting
- DigitalOcean App Platform for the web app, with Supabase for DB/Auth/Storage and RLS on all tables.
- Background jobs (reminders, PDF generation) via DigitalOcean Worker or Droplet + cron.
- Sentry for error monitoring and `/api/healthz` endpoint.
- Secrets managed so `SERVICE_ROLE_KEY` remains server-only.

## KPIs
- Project throughput (created → completed time).
- On-time delivery rate.
- Task SLA (average days overdue).
- File reuse rate.
- Service/warranty compliance (visits done vs due).
- Case study conversion (public pages → inbound leads).

