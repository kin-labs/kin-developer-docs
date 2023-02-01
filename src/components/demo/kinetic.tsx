import { BalanceResponse, KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '@kin-kinetic/solana'

export const openExplorer = ({
  account,
  transaction,
  accountBalance,
}: {
  account?: string
  accountBalance?: string
  transaction?: string
}) => {
  if (transaction) {
    window.open(`https://explorer.solana.com/tx/${transaction}?cluster=devnet`)
  } else if (account) {
    window.open(`https://explorer.solana.com/address/${account}?cluster=devnet`)
  } else if (accountBalance) {
    window.open(`https://explorer.solana.com/address/${accountBalance}/tokens?cluster=devnet`)
  }
}

const clientOptions = {
  environment: 'devnet', // mainnet or devnet
  index: 407, // your App Index
  endpoint: 'https://sandbox.kinetic.host', // devnet endpoint
}

let kineticClient: KineticSdk | undefined

export const setupKineticClient = async (onSuccess: (kinetic: KineticSdk) => void, onFailure: () => void) => {
  console.log('🚀 ~ setupKineticClient')
  if (kineticClient) {
    onSuccess && onSuccess(kineticClient)
  }
  try {
    kineticClient = await KineticSdk.setup(clientOptions)
    onSuccess && onSuccess(kineticClient)
  } catch (error) {
    console.log('🚀 ~ error', error)
    kineticClient = undefined
    onFailure && onFailure()
  }
}
export const createKeypair = async (
  onSuccess: (keypair: Keypair) => void,
  onFailure: () => void,
  mnemonic?: string,
) => {
  console.log('🚀 ~ createKeypair')

  try {
    const secret = mnemonic || Keypair.generateMnemonic()
    const keypair = Keypair.fromSecret(secret)
    onSuccess && onSuccess(keypair)
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure()
  }
}

export const createAccount = async (
  onSuccess: (signature?: string, alreadyExists?: boolean) => void,
  onFailure: () => void,
  keypair: Keypair,
) => {
  console.log('🚀 ~ createAccount')

  try {
    const accountOptions = {
      owner: keypair,
      commitment: Commitment.Confirmed, // Optional, can be Finalized, Confirmed, Processed
    }
    const transaction = kineticClient && (await kineticClient.createAccount(accountOptions))
    onSuccess && transaction?.signature && onSuccess(transaction.signature)
  } catch (error: unknown) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure()
  }
}

export const getBalance = async (
  onSuccess: (balance: BalanceResponse) => void,
  onFailure: (error: boolean) => void,
  keypair: string,
) => {
  console.log('🚀 ~ getBalance')

  try {
    const balanceOptions = {
      account: keypair,
    }
    const balance = kineticClient && (await kineticClient.getBalance(balanceOptions))
    onSuccess && balance && onSuccess(balance)
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure(true)
  }
}

export const airdrop = async (
  onSuccess: (balance: BalanceResponse) => void,
  onFailure: (error: boolean) => void,
  keypair: string,
) => {
  console.log('🚀 ~ airdrop')

  try {
    const airdropOptions = {
      account: keypair,
      amount: '1000',
      commitment: Commitment.Confirmed,
    }
    kineticClient && (await kineticClient.requestAirdrop(airdropOptions))
    const balanceOptions = {
      account: keypair,
    }
    const balance = kineticClient && (await kineticClient.getBalance(balanceOptions))
    onSuccess && balance && onSuccess(balance)
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure(true)
  }
}

export const makeTransfer = async (
  onSuccess: (balance: BalanceResponse, signature: string) => void,
  onFailure: (error: boolean) => void,
  keypair: Keypair,
  amount?: 'string',
) => {
  console.log('🚀 ~ makeTransfer')

  try {
    let sendAmount

    if (!amount) {
      const balanceCheck = await kineticClient?.getBalance({ account: keypair.publicKey })
      sendAmount = balanceCheck?.balance
    } else {
      sendAmount = amount
    }

    if (sendAmount) {
      const makeTransferOptions = {
        destination: '3AQwygEJCSpNZc9fomYx7U2XZhE9QSKwa3B1CKzagJLb',
        owner: keypair,
        amount: sendAmount,
        commitment: Commitment.Confirmed,
      }
      const transaction = kineticClient && (await kineticClient.makeTransfer(makeTransferOptions))
      console.log('🚀 ~ transaction', transaction)

      const balanceOptions = {
        account: keypair.publicKey,
      }

      const balance = kineticClient && (await kineticClient.getBalance(balanceOptions))
      onSuccess && transaction?.signature && balance && onSuccess(balance, transaction?.signature)
    } else {
      throw new Error('No Amount Specified')
    }
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure(true)
  }
}

export interface BatchItem {
  destination: string
  amount: string
}

export const defaultBatch = [
  { destination: '8CD58hLhjADzGehXLeTMBqV8iiggWmwBsswQD8tEW717', amount: '500' },
  { destination: '5ytvdo6vmzpUL53RQAxqidJR5pqnje3WhCfByWBHFEfC', amount: '300' },
  { destination: '7tY78UqzqbSRRAPRsv2t5kcJnU2NEpWwJ5C4hTHPiBJj', amount: '200' },
]

export const makeBatchTransfer = async (
  onSuccess: (balance: BalanceResponse, signature: string) => void,
  onFailure: (error: boolean) => void,
  keypair: Keypair,
  destinations: BatchItem[],
) => {
  console.log('🚀 ~ makeBatchTransfer')
  try {
    const transferBatchOptions = {
      owner: keypair,
      destinations,
      commitment: Commitment.Confirmed, // Optional, can be Finalized, Confirmed, Processed
    }

    const transaction = kineticClient && (await kineticClient.makeTransferBatch(transferBatchOptions))
    console.log('🚀 ~ transaction', transaction)

    const balanceOptions = {
      account: keypair.publicKey,
    }

    const balance = kineticClient && (await kineticClient.getBalance(balanceOptions))
    onSuccess && transaction?.signature && balance && onSuccess(balance, transaction?.signature)
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure(true)
  }
}

export const closeAccount = async (onSuccess: () => void, onFailure: (error: boolean) => void, keypair: string) => {
  console.log('🚀 ~ closeAccount')

  try {
    const closeAccountOptions = {
      account: keypair,
      commitment: Commitment.Confirmed,
    }
    const transaction = kineticClient && (await kineticClient.closeAccount(closeAccountOptions))
    console.log('🚀 ~ transaction', transaction)
    onSuccess && onSuccess()
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure(true)
  }
}
