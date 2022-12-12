import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '@kin-kinetic/solana'

const clientOptions = {
  environment: 'devnet', // mainnet or devnet
  index: 407, // your App Index
  endpoint: 'https://sandbox.kinetic.host', // devnet endpoint
}

let kineticClient: KineticSdk | undefined

export const setupKineticClient = async (
  onSuccess: (kinetic: KineticSdk) => void,
  onFailure: (error: boolean) => void,
) => {
  console.log('🚀 ~ setupKineticClient')
  if (kineticClient) {
    console.log('🚀 ~ kineticClient', kineticClient)
    onFailure(false)
    return kineticClient
  }
  try {
    kineticClient = await KineticSdk.setup(clientOptions)
    console.log('🚀 ~ kineticClient', kineticClient)
    onFailure(false)
    onSuccess(kineticClient)
  } catch (error) {
    console.log('🚀 ~ error', error)
    kineticClient = undefined
    onFailure(true)
  }
}
export const createKeypair = async (onSuccess: (keypair: Keypair) => void, onFailure: (error: boolean) => void) => {
  console.log('🚀 ~ createKeypair')

  try {
    onFailure(false)
    const mnemonic = Keypair.generateMnemonic()
    const keypair = Keypair.fromSecret(mnemonic)
    onSuccess(keypair)
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure(true)
  }
}
export const createAccount = async (onSuccess: () => void, onFailure: (error: boolean) => void, keypair: Keypair) => {
  console.log('🚀 ~ createAccount')

  try {
    onFailure(false)
    const accountOptions = {
      owner: keypair,
      commitment: Commitment.Finalized, // Optional, can be Finalized, Confirmed, Processed
    }
    kineticClient && (await kineticClient.createAccount(accountOptions))
    onSuccess()
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure(true)
  }
}

export const openExplorer = ({ account, transaction }: { account?: string; transaction?: string }) => {
  if (transaction) {
    window.open(`https://explorer.solana.com/tx/${transaction}?cluster=devnet`)
  } else if (account) {
    window.open(`https://explorer.solana.com/address/${account}?cluster=devnet`)
  }
}
