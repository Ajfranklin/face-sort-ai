import apiClient from "./apiClient"

const uploadService = async (files: File[], onProgress: any) => {
    let formData = new FormData
    files.forEach((file: File) => {
        formData.append("files", file)
    })

    console.log(onProgress)
    const res = await apiClient.post("upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress(progressEvent) {
            console.log(progressEvent)
        },
    })
    return res.data
}

export default uploadService