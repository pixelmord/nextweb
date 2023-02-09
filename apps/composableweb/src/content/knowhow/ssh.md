---
title: 'SSH'
datePublished: '2020-04-22'
dateCreated: '2019-07-23'
summary: 'SSH'
tags:
  - SSH
draft: false
---

see [SSH.com](https://www.ssh.com/ssh)

## Create a key

```bash
ssh-keygen -t rsa -b 4096
```

## Copy the key to a server

Once an SSH key has been created, the ssh-copy-id command can be used to install it as an authorized key on the server. Once the key has been authorized for SSH, it grants access to the server without a password.

### Use a command like the following to copy SSH key:

```bash
ssh-copy-id -i ~/.ssh/mykey user@host
```

This logs into the server host, and copies keys to the server, and configures them to grant access by adding them to the authorized_keys file. The copying may ask for a password or other authentication for the server.

Only the public key is copied to the server. The private key should never be copied to another machine.

## Test the new key

Once the key has been copied, it is best to test it:

```bash
ssh -i ~/.ssh/mykey user@host
```

The login should now complete without asking for a password. Note, however, that the command might ask for the passphrase you specified for the key.
