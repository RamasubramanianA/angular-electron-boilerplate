import {  getFileAndFolderArray, isFileExist } from '../fs';
import { existsSync } from 'fs';
import { CourseAvailability } from '../../../common/interface/courseAvailability';
import * as path from 'path';


export async function getTestForTheMinimumCourseAvailable(baseDirectory: string, win) {
    console.log('getTestForTheMinimumCourseAvailable -->.', baseDirectory[0]);

    let isValidPath: boolean = true;
    // make sure input parameter path is correct
    isValidPath = existsSync(baseDirectory[0].replace('\\', '\\\\'))

    console.log('isValidPath: ', isValidPath);
    if (!isValidPath) {
        win.webContents.send('courseAvailablity', {
            alertRequired: true,
            demoCousesOnly: false,
            message: 'Path specified for local library is not valid.'
        });
        return;
    // return if input parameter path is not correct
    }
    if (win) {
        let courseAvailability: CourseAvailability;
        let folders: string[] = await getFileAndFolderArray(baseDirectory[0].replace('\\', '\\\\'), true, false, false);
        if (folders.length === 0) {
            courseAvailability = {
                alertRequired: true,
                demoCousesOnly: false,
                message: 'Your local library is empty.'
            }
            win.webContents.send('courseAvailablity', courseAvailability);
            return;
            // returning because folder is empty
        } else {
            availabilityPromis(folders, baseDirectory).then((avail: CourseAvailability) => {
                win.webContents.send('courseAvailablity', avail);
                return;
            }).catch(() => {
                console.log("Undefined.");
                win.webContents.send('courseAvailablity', courseAvailability);
            });
        }
    }
    else
        console.log('win not available from CourseAvailability. ');

}


function availabilityPromis(folders: string[], baseDirectory): Promise<CourseAvailability> {
    let demoFolderFound: boolean = false;
    let invalidFolderFound: boolean = false;
    let valid: boolean = false;
    return new Promise(async (resolve, reject) => {
        console.log('availabilityPromis ---> to test eager.');
        for (let i = 0; i < folders.length; i++) {
            let file = folders[i];
            //  folders.forEach((file) => {
            if (file.substring(0, 4) == 'demo') {
                console.log('demo: ');
                demoFolderFound = true;
            } else {
                let fileCheck = path.join(baseDirectory[0].replace('\\', '\\\\'), file, 'courseDetails.json');
                await isFileExist(fileCheck).then(exist => {
                    console.log(fileCheck, exist);
                    if (exist) {
                        valid = true;
                        resolve({
                            alertRequired: false,
                            demoCousesOnly: false,
                            message: 'Course available.'
                        });
                        console.log('Resolved and returning. ');
                        return;
                    } else {
                        invalidFolderFound = true;
                    }
                });

                if (valid) {
                    console.log('valid: ', valid);
                    return;
                }

                // console.log("continueing..");

                // if (i >= (folders.length - 1)) {

                // } else {
                //     console.log("Not the last itration.");
                // }
            }


            // });
        }

        if (demoFolderFound && invalidFolderFound && !valid) {
            console.log('demoFolderFound && invalidFolderFound: ', demoFolderFound && invalidFolderFound);
            resolve({
                alertRequired: true,
                demoCousesOnly: false,
                message: 'Demo course and some folders available but no valid course found.'
            });
        }
        else if (demoFolderFound && !valid) {
            console.log('demoFolderFound: ', demoFolderFound);
            resolve({
                alertRequired: true,
                demoCousesOnly: true,
                message: 'Demo course only available. Please download some courses.'
            });
        }
        else if (invalidFolderFound && !valid) {
            console.log('invalidFolderFound: ', invalidFolderFound);
            resolve({
                alertRequired: true,
                demoCousesOnly: false,
                message: 'Some folders available but that is not a valid course.'
            })

        }
    });

}