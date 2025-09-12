# TLS Certificate Tasks
- [ ] Obtain a TLS certificate and key from a trusted certificate authority (e.g., Let's Encrypt).
- [ ] Store the certificate and key in a Kubernetes secret named `tpa-site-tls`:

  ```bash
  kubectl create secret tls tpa-site-tls \
    --cert=/path/to/cert.pem \
    --key=/path/to/key.pem \
    -n <namespace>
  ```

- [ ] Confirm `k8s/ingress.yaml` references the secret under `spec.tls`.
- [ ] Configure certificate renewal automation, such as `cert-manager`, to keep the secret updated.
- [ ] Document the certificate management workflow for team reference.
- [ ] Validate that the ingress uses the secret and the site serves HTTPS successfully.
