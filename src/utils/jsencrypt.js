import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey =
  '-----BEGIN PUBLIC KEY-----\n' +
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhaSJQwalNy0oS4K627of\n' +
  '6TTUB3SFqPZGGOA6oDn3Noz+bt4tbQRjPJNZgLzzQvtQJFjo21aL5hTX9+gviO+i\n' +
  '9meBnZ72CYCiy/u5H+DbXqeWDRRZ7NYahoegTyeUzfSNSjTfBDAE3k7CXpL4LerE\n' +
  'foQqqZ1JNHAiqrY1+DsO2ZpRM5tvVV72maQ0SVtbZrpWLIBOrc/B0+V45JEkTGNt\n' +
  'KBYKBiX9lulQ9EFC30OZ3449JgCK+4pehkHl3dF1O/g6vDPxjNwQPiJ7iiZS/+LJ\n' +
  'IKraz7t7RTs0CdJNAMNFWcpsGKpjKe2+AxIIWIsnuVleyV653ajJmIzWrbBWnzH6\n' +
  'QQIDAQAB\n' +
  '-----END PUBLIC KEY-----'

export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(txt)
}
