import { startServer } from "snowpack";
import getPort from "get-port";
import type { DevParamsT } from "./types";
import getSnowpackConfig from "./snowpack-base";

const bundler = async (params: DevParamsT) => {
  const port = await getPort({
    port: [params.port, 61001, 62002, 62003, 62004, 62005],
  });
  try {
    const config = getSnowpackConfig(
      {
        devOptions: {
          port,
          output: "stream",
          open: "none",
        },
        plugins: ["@snowpack/plugin-react-refresh"],
      },
      { storyGlob: params.stories }
    );
    await startServer({ config, lockfile: null });
  } catch (e) {
    console.error(e);
  }
};

export default bundler;