import FileSaver from "file-saver";

export const downloadImage = (id: string, photo:string) => {
  FileSaver.saveAs(photo, `download-${id}.jpg`)
}

