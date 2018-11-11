import * as fetchMock from "fetch-mock";
import {getRecordFromUrl} from "./utils";
import {getShareLink} from "./utils";

fetchMock
  .post(`${location.origin}/api/rap_rec`, (url, opts) => {
    const requestData = JSON.parse(opts.body);
    if (!requestData.loops) {
      requestData.loops = [];
    }
    if (!requestData.shots) {
      requestData.shots = [];
    }
    const guid = `rec_${Math.random()}`;

    localStorage.setItem(guid, JSON.stringify(requestData));

    console.log(getShareLink(guid));

    return {
      guid,
    };
  })
  .get(new RegExp(`${location.origin}\/api\/rap_rec`), (url, opts) => {
    const guid = getRecordFromUrl(`?${url.split("?")[1]}`);

    if (guid !== null) {
      const data = localStorage.getItem(guid);

      if (typeof data === "string") {
        return {
          data: JSON.parse(data),
        };
      }
    }
  });
