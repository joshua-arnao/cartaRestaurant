// --------------------- V@6.3.0 ---------------------
// import React from "react";
// import { Routes, BrowserRouter, Route } from "react-router-dom";
// import routes from "./routes";
// import { map } from "lodash";

// console.log(routes);

// export function Navigation() {
//   console.log();
//   return (
//     <BrowserRouter>
//       <Routes>
//         {map(routes, (route, index) => (
//           <Route
//             key={index}
//             path={route.path}
//             element={
//               <route.layout>
//                 <route.component />
//               </route.layout>
//             }
//           />
//         ))}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// --------------------- V@5.3.0 ---------------------
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import { map } from "lodash";

console.log(routes);

export function Navigation() {
  return (
    <Router>
      <Switch>
        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <route.layout>
                <route.component {...props} />
              </route.layout>
            )}
          />
        ))}
      </Switch>
    </Router>
  );
}
