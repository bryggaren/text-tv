import * as React from 'react';
// import * as mockData from '../mocks/fonderMock.json';
import * as mockData from '../mocks/238.json';
class TextTvCommunicator {
    public async getFundPages(): Promise<any> {
        try {
            const response = await fetch('https://api.texttv.nu/api/get/238?app=texttvnu.web');
            // const response = await fetch('https://api.texttv.nu/api/get/238-244?app=texttvnu.web');
            return response.ok
                ? response.json()
                : Promise.reject(
                      `Cannot communicate with the REST API server (${response.statusText})`,
                  );
        } catch (error) {
            throw error;
        }
    }

    public async getFundPagesMock(): Promise<any> {
        const jsonData = JSON.stringify(mockData);
        const fundData = JSON.parse(jsonData);
        return Promise.resolve(fundData.default);
    }
}

export const textTvCommunicator = new TextTvCommunicator();
