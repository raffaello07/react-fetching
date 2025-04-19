import React, { useEffect, useState } from "react";

export default function Fetch({ apiUrl }: { apiUrl: string }) {
  const [listItems, setListItems] = useState([] as { [key: string]: string }[]);
  const [titles, setTitles] = useState([] as string[]);
  const [isLoading, setIsLoading] = useState(true);
  const printValue = (value: any) => {
    if (
      typeof value === "string" &&
      (value.endsWith(".jpg") || value.endsWith(".png"))
    ) {
      try {
        const url = new URL(value); // Validate if it's a valid URL
        return (
          <img
            src={url.toString()}
            alt="Image"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        );
      } catch {
        return value; // Return the value if it's not a valid URL
      }
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    if (!value) {
      return "";
    }
    return value;
  };
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(apiUrl);
        const data: { [key: string]: string }[] = await response.json();
        setListItems(data);
        if (data.length) {
          setTitles(Object.keys(data[0]));
        }

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);
  if (isLoading) {
    return <p>isLoading...</p>;
  }
  if (listItems.length === 0) {
    return <p>No data to show.</p>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            {titles.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listItems.map((item, index) => (
            <tr key={index}>
              {titles.map((key) => (
                <td key={key}>{printValue(item[key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
