let json=[
    {id:0,image:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/70038075552913.5c5024ab096ce.gif"},
    {id:1,image:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/07b31575552913.5c5024ab0996f.gif"},
    {id:2,image:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8bd04775552913.5c5024ab08a26.gif"},
    {id:3,image:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3f36c675552913.5c5024ab09373.gif"},
    {id:4,image:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5f1b4f75552913.5c5024ab09069.gif"},
    {id:5,image:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fe766f75552913.5c5024ab09d43.gif"},
    {id:6,image:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c45a5930052801.56116cc81688b.png"},
    {id:7,image:"https://plus.unsplash.com/premium_photo-1664302427357-40eb7c8fd3c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {id:8,image:"https://unsplash.com/photos/shallow-focus-photo-of-gray-av-receiver-OQlPahHa7Bc"},
    {id:9,image:"https://unsplash.com/photos/black-turntable-on-brown-wooden-table-TcSckNRL9J8"},
    {id:10,image:"https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},

]

export default function songImage(songId){
   
   const song=json.find((element)=>{
        return element.id===songId;
    })
    

    return song.image;
}