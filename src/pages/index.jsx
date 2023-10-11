import SVG from "react-inlinesvg";
import SearchIcon from "../assets/icons/search.svg";
import validateUrl from "../utils/urlValidator";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/acai.css";
import { useState } from "react";

export default () => {
  const [url, setUrl] = useState("");
  const [valid, setValid] = useState(true);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const handleSubmit = async () => {
    if (!validateUrl(url)) {
      setValid(false);
    } else {
      setValid(true);
      setLoading(true);
      setHasResults(false);
      setHasError(false);
      try {
        const rs = await fetch(`/api/scrape?url=${url}`);
        if (rs.status != 200) throw new Error("error");
        setResults(await rs.json());
        setHasResults(true);
      } catch (err) {
        setHasError(true);
      }
      setLoading(false);
    }
  };
  const enterKey = async (e) => {
    if (e.keyCode === 13) {
      await handleSubmit();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mt-10">Web Scraper</h1>
        <div className="relative w-[80%] mt-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SVG src={SearchIcon.src} className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://wsa-test.vercel.app"
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={enterKey}
          />
          <div
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  cursor-pointer"
            onClick={handleSubmit}
          >
            Scrape
          </div>
        </div>
      </div>

      {!valid && (
        <div className="text-red-500 font-bold text-center">Url not valid</div>
      )}
      {loading && (
        <div className="text-center font-bold">scraping website...</div>
      )}
      {hasError && (
        <div className="text-red-500 text-center font-bold">
          Oooops something went wrong !
        </div>
      )}
      {hasResults && (
        <>
          <div className="mt-10">
            <div className="text-xl text-center mb-4">Results - Preview</div>
            <div className="flex justify-around items-center flex-wrap gap-5 p-10 w-full">
              {results.posts.map((post) => (
                <div
                  key={post.href}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
                >
                  <a href={post.href}>
                    <img className="rounded-t-lg" src={post.image} alt="" />
                  </a>
                  <div className="p-5">
                    <a href={post.href}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {post.title}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700">
                      {post.short_description}
                    </p>
                    <a
                      href={post.href}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <div className="text-xl text-center mb-4">Results - JSON</div>
            <div className="flex justify-center w-full ">
              <div className="w-[80%] mb-10 h-screen rounded-lg p-10 bg-gray-100 overflow-x-hidden overflow-y-scroll">
                <JSONPretty data={results}></JSONPretty>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
