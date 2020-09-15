export interface IAlbum {
  name: string;
  description: string;
  protected: boolean;

  folderName: string;
  files: string[];
}

export default class AlbumsState {
  albums: IAlbum[] | null = null;
}
