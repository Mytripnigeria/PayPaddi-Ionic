import { UserService } from './../user/user.service';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';

const IMAGE_DIR = 'stored-images';
interface LocalFile {
  name: string;
  path: string;
  data: string;
}
@Injectable({
  providedIn: 'root',
})
export class CameraService {
  imageFile: LocalFile[] = [];
  constructor(private plt: Platform, private userService: UserService) {}

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    if (image) {
      await this.saveImage(image);
      return await this.loadImage();
    }
  }

  private async saveImage(photo: Photo) {
    const base64Data = await this.convertPhotoToBase64(photo);
    const fileName = new Date().getTime() + '.jpg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
    });
    // console.log(savedFile);
  }
  private async convertPhotoToBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      const result = (await this.convertBlobToBase64(blob)) as string;
      return result;
    }
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async loadImage() {
    this.imageFile = [];
    return await Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR,
    }).then(
      async (result) => {
        // console.log('Result', result);
        return await this.loadImageData(result.files);
      },
      async (err) => {
        // console.log('error here', err);
        await Filesystem.mkdir({
          directory: Directory.Data,
          path: IMAGE_DIR,
        });
      }
    );
  }

  async loadImageData(fileNames: string[]) {
    for (let fileName of fileNames) {
      const filePath = `${IMAGE_DIR}/${fileName}`;

      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath,
      });
      this.imageFile.push({
        name: fileName,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
      return this.imageFile;
    }
  }

  async uploadImage(file: LocalFile) {
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, file.name);
    return await this.userService.updateProfilePicture(formData);
  }

  async deleteFile(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
  }
}
