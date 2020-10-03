export interface IAlbum {
  name: string;
  description: string;
  coverFileName: string;
  protected: boolean;

  folderName: string;

  files: string[];
  files_360: string[];

  photoDescription: {[key: string]: string};
}

export default class AlbumsState {
  albums: IAlbum[] | null = null;
}
