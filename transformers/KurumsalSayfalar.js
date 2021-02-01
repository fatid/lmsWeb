import { BaseTransformer } from './BaseTransformer'

export class KurumsalSayfalar extends BaseTransformer {
  static fetch (data) {

    // const regex = /[title]/gi;
 
     data.KurumsalSayfalar.SA_Title = data.KurumsalSayfalar.SA_Title.replace('[firm]', "Istanbul Metal Demir Çelik").replace("[title]", data.KurumsalSayfalar.SA_Baslik);
     data.KurumsalSayfalar.SA_Description= data.KurumsalSayfalar.SA_Description.replace("[firm]", "Istanbul Metal Demir Çelik").replace("[title]", data.KurumsalSayfalar.SA_Baslik);
      
    return {
      ...data.KurumsalSayfalar,
        ...data 
    }
  }

  static send (data) {
    return {
        id: data.id,
        Ad: data.name, 
    }
  }
}