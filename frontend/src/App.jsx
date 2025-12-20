import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Data from "./components/Data.jsx";
import Facebook from "./components/Facebook.jsx";
import Outlook from "./components/Outlook.jsx";
import Teams from "./components/Teams.jsx";
import WhatsApp from "./components/WhatsApp.jsx";

const defaultPreview = {
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  favicon: "",
};

export default function App() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [meta, setMeta] = useState(defaultPreview);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMetadata = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://app-meta-checker-worker.karlmantle.workers.dev/api/meta",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, username, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMeta(data);
      } else {
        setError(data.error || "Failed to fetch meta data");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchMetadata();
        }}
      >
        <input
          id="url"
          type="text"
          placeholder="https://www.something.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          id="username"
          type="text"
          placeholder="Basic Auth Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Basic Auth Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Fetch Meta Tags"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <section>
        <h2>Preview</h2>
        <Tabs>
          <TabList>
            <Tab>Data</Tab>
            <Tab>Facebook</Tab>
            <Tab>Outlook</Tab>
            <Tab>Teams</Tab>
            <Tab>WhatsApp</Tab>
          </TabList>

          <TabPanel>
            <Data meta={meta} />
          </TabPanel>
          <TabPanel>
            <Facebook meta={meta} />
          </TabPanel>
          <TabPanel>
            <Outlook meta={meta} />
          </TabPanel>
          <TabPanel>
            <Teams meta={meta} />
          </TabPanel>
          <TabPanel>
            <WhatsApp meta={meta} />
          </TabPanel>
        </Tabs>
      </section>
    </>
  );
}
