import JSZip from "jszip";

export async function extractZip(file: File): Promise<{hasInvalidFiles: boolean, images: File[]}> {
    const zip = await JSZip.loadAsync(file);
    const images = [];
    let hasInvalidFiles = false;
    console.log(zip.files)
    for (const name of Object.keys(zip.files)) {
        const entry = zip.files[name];        
        if (entry.dir) continue;
        
        if (!/\.(jpg|jpeg|png)$/i.test(name)) {
            console.log(name)
            console.warn(`Skipping unsupported file: ${name}`);
            hasInvalidFiles = true
            continue;
        }

        const blob = await entry.async("blob");
        images.push(
            new File([blob], name, { type: blob.type || "image/jpeg" })
        );
    }

    return {hasInvalidFiles, images};
}
