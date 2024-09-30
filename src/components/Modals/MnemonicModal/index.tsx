"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Snippet,
    Image,
    Spacer,
} from "@nextui-org/react"
import React from "react"
import { useMnemonicModalDisclosure } from "@/hooks"
import { useAppSelector } from "@/redux"
import { downloadTextFile } from "@/services"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

export const MnemonicModal = () => {
    const { isOpen, onClose } = useMnemonicModalDisclosure()
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const activeAccountNumber = useAppSelector(
        (state) =>
            state.authReducer.accountNumbers[preferenceChainKey].activeAccountNumber
    )
    const chain = useAppSelector(
        (state) => state.blockchainReducer.chains[preferenceChainKey]
    )

    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Mnemonic</ModalHeader>
                <ModalBody className="p-4">
                    <div className="grid gap-4">
                        <Snippet
                            hideSymbol
                            classNames={{
                                pre: "text-justify !break-all !whitespace-pre-line !line-clamp-5",
                            }}
                            codeString={mnemonic}
                            fullWidth
                        >
                            {mnemonic}
                        </Snippet>
                        <div>
                            <div className="flex gap-2 items-center">
                                <Image className="w-5 h-5" removeWrapper src={chain.imageUrl} />
                                <div className="text-xs">
                  Account Number: {activeAccountNumber}
                                </div>
                            </div>
                            <Spacer y={2} />
                            <div className="bg-warning/20 px-3 py-2.5 rounded-medium">
                                <div className="text-xs text-warning">
                You can import the mnemonic into CiWallet, along with the{" "}
                                    <span className="font-bold">Account Number</span> above, to
                retrieve this wallet on {chain.name}. Make sure to remember the{" "}
                                    <span className="font-bold">Account Number</span>.
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="p-4 pt-2">
                    <Button color="primary" variant="bordered" onPress={onClose}>
            Close
                    </Button>
                    <Button
                        onPress={() => downloadTextFile("mnemonic.txt", mnemonic)}
                        color="primary"
                    >
            Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
