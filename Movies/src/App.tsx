import axios from "axios";
import Card from "./Components/card";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [data, setData] = useState(null);
  const getData = async (url: string, post = false) => {
    let response;
    if (!post) {
      response = await axios.get(url);
    } else {
      response = await axios.post(url);
    }
    const responseData = response.data.data;
    setData(responseData);
    // console.log(responseData);
  };

  useEffect(() => {
    getData("http://127.0.0.1:3100");
  }, []);

  return (
    <>
      <Header></Header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto place-items-center gap-y-3 gap-x-3">
        {data &&
          data.map(
            (element: {
              images: { jpg: { image_url: string | undefined } };
              title:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
              episodes:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
            }) => (
              <Card
                key={Math.random()}
                image={element.images.jpg.image_url}
                title={element.title}
                episodes={element.episodes}
              />
            )
          )}
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
