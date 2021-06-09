import React from "react";
import { useCartState } from "./Cart";

export const useCart = () => {
  const [cart, setCart] = useCartState("");

  const addToCart = (data) =>
    setCart((currentState) => {
      const currentCart = currentState || [];
      return currentCart.find((e) => e.id === data.id)
        ? currentCart.reduce((acc, e) => {
            if (e.id === data.id) acc.push({ ...e, q: e.q + 1 });
            else acc.push(e);
            return acc;
          }, [])
        : [...currentCart, data];
    });

  return {
    cart: cart || [],
    setCart: addToCart,
    delCart: () => setCart([]),
  };
};

export const Article = (props) => {
  const { setCart } = useCart();
  const [isHovered, setHover] = React.useState(false);

  return (
    <>
      <div className="card-item">
        <div
          className="card-img"
          onMouseEnter={() => setHover(props.data.id)}
          onMouseLeave={() => setHover(false)}
        >
          <img
            style={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 4,
            }}
            src={"/" + props.data.img}
            alt=""
          />
          {isHovered === props.data.id && (
            <div className="addCart-background">
              <button onClick={() => setCart(props.data)} className="btn">
                <img
                  className="icon-addCart"
                  alt="Ajouter au panier"
                  src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZD0iTTQ1Ni4zMTMsODUuMzMzaC0yMC42NzdjLTMuMDk0LDAtNi4wMzEsMS4zNDQtOC4wNjMsMy42NzdjLTIuMDIxLDIuMzMzLTIuOTM4LDUuNDM4LTIuNSw4LjUgICAgIGMxLjA4Myw3LjU4MywxLjU5NCwxMy44ODUsMS41OTQsMTkuODIzQzQyNi42NjcsMTkzLjc5MiwzNjQuNDU4LDI1NiwyODgsMjU2cy0xMzguNjY3LTYyLjIwOC0xMzguNjY3LTEzOC42NjcgICAgIGMwLTUuOTM4LDAuNTEtMTIuMjQsMS41OTQtMTkuODIzYzAuNDM4LTMuMDYzLTAuNDc5LTYuMTY3LTIuNS04LjVjLTIuMDMxLTIuMzMzLTQuOTY5LTMuNjc3LTguMDYzLTMuNjc3aC0yNC43NThsLTguNjY1LTI3LjY5OCAgICAgYy0yLjc4Ni04LjkwNi0xMS4wMzYtMTQuOTY5LTIwLjM2OC0xNC45NjlIMzJjLTUuODkxLDAtMTAuNjY3LDQuNzc1LTEwLjY2NywxMC42Njd2MjEuMzMzYzAsNS44OTEsNC43NzYsMTAuNjY3LDEwLjY2NywxMC42NjcgICAgIGgzOC44OTZsNjcuNDMxLDIxNS41MDdsLTMxLjY2LDMxLjY2Yy0xMi4yNSwxMi4yNC0xNS44NzUsMzAuNDktOS4yNSw0Ni40OXMyMi4xMDQsMjYuMzQ0LDM5LjQxNywyNi4zNDRoMzAwLjUgICAgIGM1Ljg5MSwwLDEwLjY2Ny00Ljc3NiwxMC42NjctMTAuNjY3di0yMS4zMzNjMC01Ljg5Mi00Ljc3Ni0xMC42NjctMTAuNjY3LTEwLjY2N2gtMzAwLjVMMTc5LjUsMzIwaDE5NC44NTQgICAgIGMxNi40NDgsMCwzMS42MDQtOS42MTUsMzguNjE1LTI0LjVsNzQuNDM4LTE1OC4xNzdjMi4xMzUtNC41NTIsMy4yNi05LjYwNCwzLjI2LTE0LjYxNXYtMy4wMjEgICAgIEM0OTAuNjY3LDEwMC43NCw0NzUuMjYsODUuMzMzLDQ1Ni4zMTMsODUuMzMzeiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMjg4LDIzNC42NjdjNjQuNjk4LDAsMTE3LjMzMy01Mi42MzUsMTE3LjMzMy0xMTcuMzMzUzM1Mi42OTgsMCwyODgsMFMxNzAuNjY3LDUyLjYzNSwxNzAuNjY3LDExNy4zMzMgICAgIFMyMjMuMzAyLDIzNC42NjcsMjg4LDIzNC42Njd6IE0yNDUuMzMzLDEwNi42NjdoMzJ2LTMyQzI3Ny4zMzMsNjguNzcxLDI4Mi4xMDQsNjQsMjg4LDY0czEwLjY2Nyw0Ljc3MSwxMC42NjcsMTAuNjY3djMyaDMyICAgICBjNS44OTYsMCwxMC42NjcsNC43NzEsMTAuNjY3LDEwLjY2N2MwLDUuODk2LTQuNzcxLDEwLjY2Ny0xMC42NjcsMTAuNjY3aC0zMnYzMmMwLDUuODk2LTQuNzcxLDEwLjY2Ny0xMC42NjcsMTAuNjY3ICAgICBzLTEwLjY2Ny00Ljc3MS0xMC42NjctMTAuNjY3di0zMmgtMzJjLTUuODk2LDAtMTAuNjY3LTQuNzcxLTEwLjY2Ny0xMC42NjdDMjM0LjY2NywxMTEuNDM4LDIzOS40MzgsMTA2LjY2NywyNDUuMzMzLDEwNi42Njd6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxjaXJjbGUgY3g9IjE0OS4zMzMiIGN5PSI0NjkuMzMzIiByPSI0Mi42NjciIGZpbGw9IiMwMDAwMDAiLz4KCQkJPGNpcmNsZSBjeD0iNDA1LjMzMyIgY3k9IjQ2OS4zMzMiIHI9IjQyLjY2NyIgZmlsbD0iIzAwMDAwMCIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
                />
                Ajouter au panier
              </button>
            </div>
          )}
        </div>
        <h4>{props.data.name}</h4>
        <p style={{ marginTop: "-15px", marginBottom: 20 }}>
          {props.data.price} €
        </p>
      </div>
    </>
  );
};
