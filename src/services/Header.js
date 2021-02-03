
export default function Header() {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.accessToken){
        return {Authorization:'Bearer: ' + user.accessToken};
    } else {
        return {};
    }
    //this header will be with jwt to sucessfully get data later

}
