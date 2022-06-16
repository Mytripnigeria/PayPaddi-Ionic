import { UtilityService } from './../utility/utility.service';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseUrl = environment.baseUrl;
  accessToken = null;
  constructor(private util: UtilityService) {
    this.util.getItem('accessToken').then((Res) => {
      console.log(Res);
    });
  }

  async axiosPost(point, data) {
    let token = null;
    const tokens = await this.util.getItem('accessToken');

    if (point !== 'login') {
      token = await this.util.getItem('accessToken');
      console.log('token===>', token);
    } else {
      token = null;
    }

    try {
      const result = await axios.post(
        this.baseUrl + point,
        data,
        this.reqConfig(token)
      );
      return { result, error: null };
    } catch (error) {
      return { result: null, error };
    }
  }

  async axiosGet(point, param?) {
    const token = await this.util.getItem('accessToken');
    try {
      const result = await axios.get(
        this.baseUrl + point,
        this.reqConfig(token)
      );
      return { result, error: null };
    } catch (error) {
      return { result: null, error };
    }
  }

  async axiosPostFile(point, data: FormData) {
    const token = await this.util.getItem('accessToken');

    try {
      const result = await axios.post(this.baseUrl + point, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token.value}`,
        },
      });
      return { result, error: null };
    } catch (error) {
      return { result: null, error };
    }
  }

  reqConfig(token) {
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      };
    } else {
      return null;
    }
  }
}
