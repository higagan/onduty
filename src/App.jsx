import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        {/* Your app content */}
      </Layout>
    </>
  );
}; 