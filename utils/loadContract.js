const NETWORK_ID = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID

export const loadContract = async (name, web3) => {
  const res = await fetch(`/contracts/${name}.json`)
  const Artifact = await res.json()
  let contract = null
  try {
      contract  = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    )
  } catch(error) {
    console.log(error)
    console.log(`Contract ${name} cannot be loaded`)
  }

  return contract
}