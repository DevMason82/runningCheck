import crypto from "crypto";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function generateHmac(method, url, secretKey, accessKey) {
  const parts = url.split(/\?/);
  const [path, query = ""] = parts;

  // Day.js를 이용한 현재 UTC 시간 포맷
  const datetime = dayjs().utc().format("YYMMDD[T]HHmmss[Z]");
  const message = datetime + method + path + query;

  // HMAC SHA256 서명 생성
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("hex");

  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;
}
