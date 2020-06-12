import { existsSync } from "fs";
import { getFileAndFolderArray, isFileExist } from "./../../require/fsRelated";
import { CourseDetails } from "./../../../common/interface/courseDetails";
import * as path from 'path';
import * as fsExtra from "fs-extra";


export async function request_course_details(baseDirectory, win) {
    console.log('request_course_details -->.', baseDirectory[0]);
    let courseList;
    let isValidPath: boolean = true;
    // make sure input parameter path is correct
    isValidPath = existsSync(baseDirectory[0].replace('\\', '\\\\'))

    console.log('isValidPath: ', isValidPath);
    if (!isValidPath) {
        win.webContents.send('course-details', []);
        return;
        // return if input parameter path is not correct
    }
    if (win) {
        let folders: string[] = await getFileAndFolderArray(baseDirectory[0].replace('\\', '\\\\'), true, false, false);
        if (folders.length === 0) {
            courseList = [];
            win.webContents.send('course-details', courseList);
            return;
            // returning because folder is empty
        } else {
            courseListPromis(folders, baseDirectory).then((courses) => {
                win.webContents.send('course-details', courses);
                return;
            }).catch(() => {
                console.log("Undefined.");
                win.webContents.send('course-details', []);
            });
        }
    }
    else
        console.log('win not available from CourseAvailability. ');
}


function courseListPromis(folders: string[], baseDirectory): Promise<CourseDetails[]> {
    let courseDetails: CourseDetails[] = [];
    return new Promise(async (resolve, reject) => {
        console.log('courseListPromis ---> to test eager.');
        for (let i = 0; i < folders.length; i++) {
            let file = folders[i];

            let fileCheck = path.join(baseDirectory[0].replace('\\', '\\\\'), file, 'courseDetails.json');
            await isFileExist(fileCheck).then(async (exist) => {
                console.log(fileCheck, exist);
                if (exist) {
                    const courseDetailsObj = await fsExtra.readJson(fileCheck);
                    console.log('courseDetailsObj: ', courseDetailsObj);
                    courseDetails.push(courseDetailsObj);
                } else {
                    console.log(fileCheck, 'not exist.');
                }
            });
        }
        console.log('courseDetails: ', courseDetails);
        resolve(courseDetails);
    });
}