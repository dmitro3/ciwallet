import { createHash } from "crypto"

export const sha256Hash = (
    data: string,
    salt?: string,
    digest: "base64" | "hex" = "base64"
): string => {
    const hash = createHash("sha256")
    hash.update(data + (salt ?? ""))
    return hash.digest(digest)
}
