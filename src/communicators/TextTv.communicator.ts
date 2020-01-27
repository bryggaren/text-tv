import * as React from 'react';
class TextTvCommunicator {
    public async getFundPages(): Promise<any> {
        try {
            const response = await fetch('http://api.texttv.nu/api/get/238-244?app=texttvnu.web');
            return response.ok
                ? response.json()
                : Promise.reject(
                      `Cannot communicate with the REST API server (${response.statusText})`,
                  );
        } catch (error) {
            throw error;
        }
    }
}

export const textTvCommunicator = new TextTvCommunicator();
