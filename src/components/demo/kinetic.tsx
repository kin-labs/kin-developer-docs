import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '@kin-kinetic/solana'

const clientOptions = {
  environment: 'devnet', // mainnet or devnet
  index: 407, // your App Index
  endpoint: 'https://sandbox.kinetic.host', // devnet endpoint
}

let kineticClient: KineticSdk | null

export const setupKineticClient = async (
  onSuccess: (kinetic: KineticSdk) => void,
  onFailure: (error: boolean) => void,
) => {
  console.log('🚀 ~ setupKineticClient')
  if (kineticClient) {
    onFailure(false)
    return kineticClient
  }
  try {
    kineticClient = await KineticSdk.setup(clientOptions)
    onFailure(false)
    onSuccess(kineticClient)
  } catch (error) {
    console.log('🚀 ~ error', error)
    kineticClient = null
    onFailure(true)
  }
}
export const createKeypair = async (onSuccess: (keypair: KineticSdk) => void, onFailure: (error: boolean) => void) => {
  console.log('🚀 ~ setupKineticClient')
  if (kineticClient) {
    onFailure(false)
    return kineticClient
  }
  try {
    kineticClient = await KineticSdk.setup(clientOptions)
    onFailure(false)
    onSuccess(kineticClient)
  } catch (error) {
    console.log('🚀 ~ error', error)
    kineticClient = null
    onFailure(true)
  }
}
