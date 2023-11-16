### Generate Private Key:

to into the secret directory:
```mkdir .secret && cd .secret```

Create a selfsigned certificate using mkcert. Install mkcert first with there [instructions](https://github.com/FiloSottile/mkcert)

```The run mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1```

and boom you have a selfsigned certificate. 
