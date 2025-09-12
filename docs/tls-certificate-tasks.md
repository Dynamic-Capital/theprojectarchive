# TLS Certificate Tasks
- [ ] Obtain a TLS certificate and key from a trusted certificate authority (e.g., Let's Encrypt).
- [ ] Create a Kubernetes secret named `tpa-site-tls` containing the certificate and private key.
- [ ] Configure certificate renewal automation, such as `cert-manager`, to keep the secret updated.
- [ ] Document the certificate management workflow for team reference.
- [ ] Validate that the ingress uses the secret and the site serves HTTPS successfully.
