import React from 'react';
import {resolveSrcName} from './utils';

// Demo component.
export const Demo = ({children}) => (
  <section className="grid-demo">{children}</section>
);

// Header component.
export const Header = ({children}) => (
  <div className="controls">{children}</div>
);

// Select component.
export const Select = ({values, onChange}) => (
  <div className={'control'}>
    <div className="control-icon">
      <i className="material-icons">&#xE164;</i>
    </div>
    <div className="select-arrow">
      <i className="material-icons">&#xE313;</i>
    </div>
    <select
      className="control-field filter-field form-control"
      onChange={onChange}
      defaultValue={values[0]}>
      {values.map((value) => (
        <option key={value} value={value.toLowerCase()}>
          {value}
        </option>
      ))}
    </select>
  </div>
);

// Input component.
export const Input = ({onKeyUp}) => (
  <div className={'control'}>
    <div className="control-icon">
      <i className="material-icons">&#xE8B6;</i>
    </div>
    <input
      className={'control-field search-field form-control'}
      onKeyUp={onKeyUp}
      type="text"
      placeholder={'Search...'}
    />
  </div>
);

// Switch component.
export const Switch = React.forwardRef(({children}, ref) => (
  <div className="container">
    <div className="main snapped">
      <LeftController />
      <RightController />
      <div className="screenframe">
        <div className="inlay">
          <div className="screen" ref={ref}>
            {children}
          </div>
        </div>
      </div>
    </div>
    <div className="shadow snapped" />
  </div>
));

// Left controller.
export const LeftController = React.memo(() => (
  <div className="leftcontroller">
    <div className="lefttrigger" />
    <div className="slider" />
    <div className="leftgrip">
      <div className="minus" />
      <div className="dpad">
        <div className="up dpadbutton fonts">▲</div>
        <div className="down dpadbutton fonts">▼</div>
        <div className="left dpadbutton fonts">◀</div>
        <div className="right dpadbutton fonts">▶</div>
      </div>
      <div className="mysterybutton" />
      <div className="analogstick">
        <div className="divider divider1" />
        <div className="divider divider2" />
        <div className="divider divider3" />
        <div className="divider divider4" />
      </div>
    </div>
  </div>
));

// Right controller.
export const RightController = React.memo(() => (
  <div className="rightcontroller">
    <div className="righttrigger" />
    <div className="slider" />
    <div className="rightgrip">
      <div className="plus" />
      <div className="dpad">
        <div className="up dpadbutton fonts">X</div>
        <div className="down dpadbutton fonts">B</div>
        <div className="left dpadbutton fonts">Y</div>
        <div className="right dpadbutton fonts">A</div>
      </div>
      <div className="analogstick">
        <div className="divider divider1" />
        <div className="divider divider2" />
        <div className="divider divider3" />
        <div className="divider divider4" />
      </div>
      <div className="home">
        <div className="homecenter" />
      </div>
    </div>
  </div>
));

// Card content.
export const CardContent = React.memo(({types, name, number, pokedexIndex}) => {
  const srcName = resolveSrcName(name);

  return (
    <div className="poke-card-container">
      <div
        className="poke-card"
        data-pokemon-type={types[0]}
        id="f727f904-94d9-48e1-ab91-f7e76f1f18f5">
        <div className="poke-card__image">
          <img
            className=""
            src={`http://cdn3.bulbagarden.net/uploads/pokemonsunmoon/pokemon_stat/image/${pokedexIndex}/pokedex_${number}${srcName}.png`}
            alt={`Pokedex ${number} ${name}`}
          />
          <svg
            enableBackground="new 0 0 285 220"
            viewBox="0 0 285 220"
            x="0px"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            y="0px">
            <g>
              <polygon points="97.8,67.4 -2.3,3 7.6,-10.2" />
              <polygon points="213.5,153.5 301.4,211.2 293.8,221.2" />
              <polygon points="39.8,159.5 -10.6,195.3 -16.5,185.1" />
              <polygon points="253.4,34 289.8,1.8 299.4,18.2" />
              <polygon points="36.7,109.4 0,116.1 -0.5,108.2" />
              <polygon points="256.6,89.7 292,78 293.1,94.9" />
              <polygon points="115.2,60.6 61.6,0.4 83.5,-13.5" />
              <polygon points="179.4,161.7 224.6,209.8 203.6,223.1" />
              <polygon points="72.7,166.5 25.2,246 -1.9,221.2" />
              <polygon points="199.3,38.5 235.3,-16.5 250.6,-2.4" />
              <polygon points="180.8,38.9 193,-15.5 215,-5.1" />
              <polygon points="107.6,170.8 88.7,228.9 74.9,222.4" />
              <polygon points="131.3,54.4 109,-5.6 133.1,-9.6" />
              <polygon points="160.2,176 180.5,213.9 160,219" />
              <polygon points="151.6,53.6 154.8,-9.3 175.8,-4.6" />
              <polygon points="123.9,176.4 127.1,206.3 108.1,202" />
              <polygon points="222.9,138.4 306.7,167.5 298.8,184.2" />
              <polygon points="70,66.1 -17.8,37.5 -7.9,16.6" />
              <polygon points="235,108.5 293.1,106.6 291.5,122.5" />
              <polygon points="36.5,89.4 -2.1,91.3 -1,79.9" />
              <polygon points="60.5,128.7 -3.4,161.5 -9.7,143.9" />
              <polygon points="215.3,73.1 297.2,32.2 304.5,52.5" />
            </g>
          </svg>
        </div>
        <h2 className="poke-card__name">
          <span>{name}</span>
          <svg className="right">
            <use xlinkHref="#icon-rounded-tri-right">
              <svg id="icon-rounded-tri-right" viewBox="0 0 32 32">
                <title>rounded-tri-right</title>
                <path
                  className="path1"
                  d="M3.424 1.76l20.864 28.48c0.8 1.088 2.080 1.728 3.424 1.728h-27.712v-31.936c1.344 0 2.624 0.64 3.424 1.728z"
                />
              </svg>
            </use>
          </svg>
          <svg className="left">
            <use xlinkHref="#icon-rounded-tri-left">
              {' '}
              <svg id="icon-rounded-tri-left" viewBox="0 0 32 32">
                <title>rounded-tri-left</title>
                <path
                  className="path1"
                  d="M28.576 1.728l-20.896 28.48c-0.8 1.088-2.080 1.728-3.424 1.728h27.744v-31.936c-1.344 0-2.624 0.64-3.424 1.728z"
                />
              </svg>
            </use>
          </svg>
        </h2>
        <span className="poke-card__pokedex-number">
          <span>{`#${number}`}</span>
          <svg className="right">
            <use xlinkHref="#icon-rounded-slim-tri-bottom-right">
              <svg id="icon-rounded-slim-tri-bottom-right" viewBox="0 0 32 32">
                <title>rounded-slim-tri-bottom-right</title>
                <path
                  className="path1"
                  d="M13.472 2.944l-9.312 26.016c-0.64 1.824-2.368 3.040-4.32 3.040v-32.096h17.92c-1.92 0-3.648 1.216-4.288 3.040z"
                />
              </svg>{' '}
            </use>
          </svg>
          <svg className="left">
            <use xlinkHref="#icon-rounded-slim-tri-bottom-left">
              <svg id="icon-rounded-slim-tri-bottom-left" viewBox="0 0 32 32">
                <title>rounded-slim-tri-bottom-left</title>
                <path
                  className="path1"
                  d="M18.56 2.848l9.312 26.080c0.64 1.824 2.4 3.040 4.32 3.040v-32.192h-17.984c1.952 0.032 3.68 1.248 4.352 3.072z"
                />
              </svg>
            </use>
          </svg>
        </span>
        <ul className="poke-card__types">
          {types.map((type) => (
            <li
              key={type}
              className={'poke-card__types__' + type.toLowerCase()}>
              <span>{type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
