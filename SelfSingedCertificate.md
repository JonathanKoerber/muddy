### Generate Private Key:

to into the secret directory:
```mkdir .secret```

generate a new private key without a passphrase and create a new CSR (Certificate Signing Request) and then a new certificate: 
```openssl genpkey -algorithm RSA -out .secret/private.key```

Generate Certificate Signing Request (CSR):

```openssl req -new -key .secret/private.key -out .secret/certificate.csr```

Generate Self-Signed Certificate:

```openssl x509 -req -days 365 -in .secret/certificate.csr -signkey .secret/private.key -out .secret/certificate.crt```



Now you have the following files:

    private.key (encrypted private key)
    private-unencrypted.key (unencrypted private key, for development only)
    certificate.csr (certificate signing request)

    certificate.crt (self-signed certificate)
