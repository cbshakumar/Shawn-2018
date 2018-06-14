# Instructions

## To run the server:

1. Clone repository
2. cd into directory
2. npm install
3. npm start

## To use the client files:
#### 1. cd client\_files

#### 2. To register a user:
```
  node register.js {user} {password}
```
  user - The user you want to register with.

  password - The password you want the user to register with.

#### 3. To add a public key:
```
  node add_key.js {user} {password} {publicKeyFilePath}
```
  user - User to register public key for.

  password - Password for the user.

  publicKeyFilePath - Relative file path for the public key pem file. Example: './publicKey.pem'

#### 4. Generate a signature for your message(for testing convenience purposes, does not call the server)
```
  node signature_generator.js {privateKeyPemFilePath} {message}
```
  privateKeyPemFilePath - Relative file path for the private key pem file. Example: './privateKey.pem'

  message - Message which a signature will be generated for.

  Output for this will be a sha512 hash encrypted with the private key in hex format.

#### 5. To verify a message
```
  node verify_message.js {user} {message} {signature}
```

  user - The user you want to ensure sent your message.

  message - Message to be verified. Messages should only be up to 2048 characters.

  signature - sha512 message hash encrypted with private key. The signature should be in hex format.

Notes: Server is not using https. In a production environment, the server would talk to a load balancer which would handle incoming https traffic.

