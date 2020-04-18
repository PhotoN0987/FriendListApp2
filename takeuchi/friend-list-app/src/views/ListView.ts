import axios from 'axios'
import { User } from "../models/User";

export class ListView {

  //#region Components
  userList: HTMLElement | null;
  button: HTMLElement | null;
  //#endregion

  constructor() {
    // HTMLElement取得
    this.userList = document.getElementById('user-list')
    this.button = document.getElementById('button')

    // イベントの登録
    this.button?.addEventListener("click", () => {
      this.buttonClick()
    });
  }

  //#region Events

  // ロード時
  public async loadView() {
    // 結果が取得できるまで待つ
    const users = await this.getFriendList()

    if (users === null) {
      this.userList?.insertAdjacentHTML('afterbegin', '<p style="color: red">おともだちリストが取得できませんでした。</p>')
      return
    }

    // usersの中身の数だけ繰り返す
    for (const user of users) {

      // ユーザーの名前を取得
      const name = user.name

      // ユーザーの好きなものを取得
      const favorite = user.favorite

      // ユーザーの名前と、好きなものをpタグで出力
      this.userList?.insertAdjacentHTML('afterbegin', `<p>名前：${name}、好きなもの：${favorite}</p>`)
    }
  }


  // {
  // "updateMask" ：{
  //   object（DocumentMask）
  // } 、
  // "currentDocument" ：{
  //   object（Precondition）
  // } 、

  // //ユニオンフィールドoperationは次のいずれかになります：
  // "update" ：{
  //   object（Document）
  // } 、
  // "delete" ：string 、
  // "transform" ：{
  //   object（DocumentTransform）
  // }
  //
  //ユニオンフィールドの可能なタイプのリストの終わりoperation。
  // }

  // buttonがクリックされたとき
  public buttonClick() {
    axios.post('documents:commit', {
      update: {
        name: 'projects/friend-list-app-80ca0/databases/(default)/documents/users/2zvC6qdeajc4rzvMdvwv',
        fields: {
          name: {
            stringValue: 'Foo'
          },
          favorite: {
            stringValue: 'Bar'
          }
        }
      }
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  //#endregion

  //#region  Private Methods

  // おともだちリストをFirebaseから非同期で取得
  private async getFriendList() {

    return await axios
      .get('documents/users')
      .then(response => {
        console.log(response.data.documents)

        // レスポンスの内容を代入
        const users = User.setUsers(response.data.documents)

        return users
      })
      .catch(error => {
        console.log(error)
        return null
      })
  }

  //#endregion

}