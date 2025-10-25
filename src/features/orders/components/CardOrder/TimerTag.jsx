import { Tag } from "primereact/tag";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useMemo, useState } from "react";
dayjs.extend(customParseFormat);

export default function TimerTag({ createdAt }) {
  const warningMinutes = 15;
  const [now, setNow] = useState(dayjs());

  const timeDiff = useMemo(() => {
    const created_at = dayjs(createdAt, "DD-MM-YYYY HH:mm:ss");

    const diffInSec = now.diff(created_at, "second");
    const diffInMin = now.diff(created_at, "minute");
    const diffInHours = now.diff(created_at, "hour");
    const diffInDays = now.diff(created_at, "day");

    if (diffInSec < 60) {
      return `${diffInSec} s`;
    }

    if (diffInMin < 60) {
      return `${diffInMin} m`;
    }

    if (diffInHours < 24) {
      const mins = diffInMin % 60;
      return `${diffInHours} h ${mins} m`;
    }

    const hours = diffInHours % 24;
    const mins = diffInMin % 60;

    return `${diffInDays}d ${hours}h ${mins}m`;
  }, [now]);

  const severity = useMemo(() => {
    const created_at = dayjs(createdAt, "DD-MM-YYYY HH:mm:ss");
    const diffInMin = now.diff(created_at, "minute");

    if (diffInMin < warningMinutes) return "success";

    return "danger";
  }, [now]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return <Tag value={timeDiff} severity={severity} size="small" />;
}
