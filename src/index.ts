/**
 * 
 * 
import * as parseTorrent from "parse-torrent";
import * as fs from "fs";
import * as path from "path";
import * as util from "util";
import { ParsedFile } from "parse-torrent-file";
import { readConfig, Config } from "./nameParser";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);


run()
    .then(() => {
        console.info("done");
    })
    .catch(err => {
        console.error(err);
    });


async function run() {

    const config = await readConfig("./config.json");

    return config;
}



//readAndParseNames();




function readAndParseNames(config: Config) {

    readFile("./fileset.json")
        .then(buffer => JSON.parse(buffer.toString()) as {
            files: {
                path: string,
                name: string,
                title?: string,
                seasonNumber?: number,
                episodeNumber?: number
            }[]
        })
        .then(data => {

            const unparsed: { path: string, name: string }[] = [];
            const files: {
                path: string,
                name: string,
                title?: string,
                seasonNumber?: number,
                episodeNumber?: number
            }[] = [];

            for (let file of data.files) {

                const path = file.path.toLowerCase();

                if (path.indexOf("extras") !== -1) continue;
                if (path.indexOf("formula") !== -1) continue;
                if (path.indexOf("baby einstein") !== -1) continue;
                if (path.indexOf("band of brothers") !== -1) continue;
                if (path.indexOf("bbc") !== -1) continue;
                if (path.indexOf("rarbg.com") !== -1) continue;
                if (path.indexOf("evreyskoe.schastie") !== -1) continue;
                if (path.indexOf("f1 201") !== -1) continue;
                if (path.indexOf("f1.201") !== -1) continue;
                if (path.indexOf("sample") !== -1) continue;
                if (path.indexOf("special") !== -1) continue;


                if (path.indexOf("method.") !== -1) continue;
                if (path.indexOf("mosgaz.") !== -1) continue;
                if (path.indexOf("okhota.na.izyubrya") !== -1) continue;
                if (path.indexOf("ottepel") !== -1) continue;
                if (path.indexOf("top.gear") !== -1) continue;
                if (path.indexOf("top gear") !== -1) continue;
                if (path.indexOf("top_gear") !== -1) continue;
                if (path.indexOf("обратная сторона луны") !== -1) continue;
                if (path.indexOf("палач") !== -1) continue;

                if (path.indexOf("пепел") !== -1) continue;
                if (path.indexOf("метод") !== -1) continue;
                if (path.indexOf("побег") !== -1) continue;
                if (path.indexOf("игра") !== -1) continue;




                const r = parseName(config, file.name);
                if (!r) {

                    const lfile = file.name.toLowerCase()

                    if ((lfile.endsWith(".avi") ||
                        lfile.endsWith(".mkv") ||
                        lfile.endsWith(".mp4")
                    )) {

                        delete file.title;
                        delete file.seasonNumber;
                        delete file.episodeNumber;

                        unparsed.push(file);
                    }
                } else {
                    files.push(file);
                    file.title = r.title;
                    file.seasonNumber = r.seasonNumber;
                    file.episodeNumber = r.episodeNumber;
                }
            }


            const titles: {
                [name: string]: {
                    path: string,
                    name: string,
                    title?: string,
                    seasonNumber?: number,
                    episodeNumber?: number
                }
            } = {};
            //collapse
            for (const file of files) {
                if (file.title) {
                    let tl = titles[file.title];
                    if (tl === undefined) {
                        titles[file.title] = file;
                    }
                }
            }

            const files_reduced: {
                path: string,
                name: string,
                title?: string,
                seasonNumber?: number,
                episodeNumber?: number
            }[] = [];

            for (const tlname in titles) {
                if (titles.hasOwnProperty(tlname)) {
                    const title = titles[tlname];
                    files_reduced.push(title);
                }
            }

            return { data: files_reduced, unparsed };
        })
        .then(files => {
            console.info(files.unparsed.length);
            return files;
        })
        .then(files => {

            return Promise.all(
                [
                    writeFile("./unparsed.json", JSON.stringify({ files: files.unparsed }, null, 4)),



                    writeFile("./fileset.json", JSON.stringify({ files: files.unparsed.concat(files.data) }, null, 4))
                ]
            )
        });

}

function parseName(config: Config, name: string) {


    for (const p of config.nameParsers) {

        const result = p.pattern.exec(name);
        if (result !== null && result.length >= p.maxIndex) {

            const seasonNumber = parseNumber(result[p.seasonIndex]);
            const episodeNumber = parseNumber(result[p.episodeIndex]);

            let title = "";
            if (p.usePath) {

            } else if (p.titleIndex) {
                title = result[p.titleIndex];
            }




            if (title && seasonNumber !== null && episodeNumber !== null) {
                return {
                    title, seasonNumber, episodeNumber
                };
            }
        }
    }
}

function parseNumber(value: string) {
    if (value) {
        try {
            return parseInt(value);
        }
        catch (err) {
            return null;
        }
    }
    return null;
}



function parseTorrentFiles() {
    const root = "./Torrents/";
    const trfiles: { path: string, name: string }[] = [];
    const promises: Promise<void>[] = [];
    readdir(root).then(files => {

        for (const file of files) {

            const fullPath = path.resolve(root, file);

            if (path.extname(fullPath) === ".torrent") {
                promises.push(
                    readFile(fullPath).then(buffer => {
                        try {
                            const tr = parseTorrent(buffer) as parseTorrent.Instance;

                            if (tr && tr.files) {
                                for (const trf of tr.files) {

                                    const lfile = trf.name.toLowerCase();

                                    if ((lfile.endsWith(".avi") ||
                                        lfile.endsWith(".mkv") ||
                                        lfile.endsWith(".mp4"))) {
                                        trfiles.push({ name: trf.name, path: trf.path });
                                    }
                                    //console.info(trf.name);
                                }
                            }
                        }
                        catch (err) {
                            console.error(err);
                        }

                    }));
            }

        }

    }).then(d => {

        return Promise.all(promises).then(v => {

            console.info(trfiles.length);

            return writeFile("./fileset.json", JSON.stringify({ files: trfiles }, null, 4));

        })
    }).catch(err => { console.error(err); });
}
 * 
 */