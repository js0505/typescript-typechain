import * as CryptoJS from "crypto-js"

class Block {
	// static method
	//  : 메소드가 클래스 내에있고, 클래스가 생성되지 않았어도
	//    클래스 내에서 호출 할 수 있는 메소드

	// 해시값 계산.
	static calculateBlockHash = (
		index: number,
		previousHash: string,
		timestamp: number,
		data: string,
	): string =>
		CryptoJS.SHA256(index + previousHash + timestamp + data).toString()

	// 구조확인
	// 각 인자값의 타입을 확인해서 boolean으로 리턴
	static validateStructure = (aBlock: Block): boolean =>
		typeof aBlock.index === "number" &&
		typeof aBlock.hash === "string" &&
		typeof aBlock.previousHash === "string" &&
		typeof aBlock.timestamp === "number" &&
		typeof aBlock.data === "string"

	public index: number
	public hash: string
	public previousHash: string
	public data: string
	public timestamp: number

	constructor(
		index: number,
		hash: string,
		previousHash: string,
		data: string,
		timestamp: number,
	) {
		this.index = index
		this.hash = hash
		this.previousHash = previousHash
		this.data = data
		this.timestamp = timestamp
	}
}

const genesisBlock: Block = new Block(0, "20022002200", "", "Hello", 123456)

// 블록체인이 담기는 배열.
let blockchain: Block[] = [genesisBlock]

// 모든 블록체인 가져오기
const getBlockChain = (): Block[] => blockchain
// 가장 마지막 블록체인 가져오기
const getLatestBlock = (): Block => blockchain[blockchain.length - 1]
// 새로운 timestamp 생성
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000)

// 새로운 Block을 만드는 함수
const createNewBlock = (data: string): Block => {
	// 가장 마지막 블록체인 데이터 가져오기
	const previousBlock: Block = getLatestBlock()

	// 이전 블록의 인덱스에 +1 값을 부여해서 인덱스 생성
	const newIndex: number = previousBlock.index + 1

	// 새로운 시간값 생성
	const newTimeStamp: number = getNewTimeStamp()

	// 새로운 해시값 생성
	const newHash: string = Block.calculateBlockHash(
		newIndex,
		previousBlock.hash,
		newTimeStamp,
		data,
	)

	// 새로운 데이터들로 Block 생성
	const newBlock: Block = new Block(
		newIndex,
		newHash,
		previousBlock.hash,
		data,
		newTimeStamp,
	)

	// 검증과정을 거친 뒤 블록채인에 블록을 추가하는 함수.
	addBlock(newBlock)

	// 생성된 Block 리턴
	return newBlock
}

// 검증에 사용 할 해시값 계산 함수.
const getHashforBlock = (aBlock: Block): string =>
	Block.calculateBlockHash(
		aBlock.index,
		aBlock.previousHash,
		aBlock.timestamp,
		aBlock.data,
	)

// candidate = 후보. 비교대상?
// 구조, 해시값 비교.
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
	// 입력된 Block 인자값들의 타입확인
	if (!Block.validateStructure(candidateBlock)) {
		return false

		// 이전 Block과 인덱스값이 1 차이가 나는지 확인.
		// 1 차이가 아니면 맞지않는 블록의 연결이므로
	} else if (previousBlock.index + 1 !== candidateBlock.index) {
		return false

		// 이전 블록의 해시값과 인자로 들어온 블록의 해시값..은 같아야 하는건가?
	} else if (previousBlock.hash !== candidateBlock.previousHash) {
		return false

		// 인자로 들어온 블록의 해시값을 다시 계산해서 들어온 블록의 기존 해시값과 일치 하는지 확인.
	} else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
		return false

		// 다 통과하면 true
	} else {
		return true
	}
}

// 새로운 블럭을 생성하고 검증 후 블록체인에 블록을 담는 최종 함수.
const addBlock = (candidateBlock: Block): void => {
	if (isBlockValid(candidateBlock, getLatestBlock())) {
		blockchain.push(candidateBlock)
	}
}

createNewBlock("second block")
createNewBlock("third block")
createNewBlock("fourth block")

console.log(blockchain)

export {}
