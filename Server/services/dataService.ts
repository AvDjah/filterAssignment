


export const driveService = () => {

    const folderId = "1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS"

    const GOOGLE_API = process.env.GOOGLE_API
    const { google } = require('googleapis')
    // @ts-ignore
    const drive = google.drive({ version: "v3", auth: GOOGLE_API.toString()})
    let conf : { maxResults : number, orderBy : string, q : string } = {
        maxResults: 0,
        orderBy: "",
        q: ""
    };
    conf.maxResults = 10;
    conf.orderBy = "createdTime";
    conf.q = `'${folderId}' in parents`;

    return new Promise<string[]>((resolve,reject) => {
        drive.files.list(conf, function (error: any, response: { data: { files: any[]; }; }) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                let files : string[] = []
                response.data.files.map(file => {
                    let fileUrl = 'https://drive.google.com/u/0/uc?id=' + file.id
                    files.push(fileUrl)
                    console.log('fileUrl ', fileUrl )
                })
                resolve(files)
            }
        });
    })
}