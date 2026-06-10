import hre from 'hardhat'

async function main() {
  const [deployer] = await hre.ethers.getSigners()
  console.log('Deploying with:', deployer.address)

  const ScoreBoard = await hre.ethers.getContractFactory('PharosScoreBoard')
  const scoreBoard = await ScoreBoard.deploy()
  await scoreBoard.waitForDeployment()

  const address = await scoreBoard.getAddress()
  console.log('PharosScoreBoard deployed to:', address)
  console.log('Update CONTRACT_ADDRESS in src/hooks/useBlockchain.js with the above address.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
