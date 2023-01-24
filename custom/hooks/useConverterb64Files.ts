

export const useConverterb64Files = () => {

    const convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const getImageBase64 = async (file: File): Promise<string | null> => {
        try {
            const image = await convertBase64(file);
            return image as string;
        } catch (error) {
            return null;
        }
    };

    return { getImageBase64 };
}
