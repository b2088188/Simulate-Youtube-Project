import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { colorGrey, colorPrimary, setFlex, media } from '../utils';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { Link } from '../components/Link';

export const Form = styled.form`
   flex: 0 0 50%;
   display: flex;
   flex-direction: column;
`;

export const FormGroup = styled.div`
   // margin-bottom
   ${({ mb }) => (mb && typeof mb === 'string' ? `margin-bottom: ${mb}rem;` : null)}
   ${({ mb }) => (mb && mb.desktop ? `margin-bottom: ${mb.desktop}rem;` : null)}
   ${({ mb }) => (mb && mb.tabland ? media.tabland(`margin-bottom: ${mb.tabland}rem;`) : null)}
   ${({ mb }) => (mb && mb.tabport ? media.tabport(`margin-bottom: ${mb.tabport}rem;`) : null)}
   ${({ mb }) => (mb && mb.phone ? media.phone(`margin-bottom: ${mb.phone}rem;`) : null)}
   ${setFlex({ direction: 'column' })}
   // flex-direction
   ${({ direction }) =>
      direction && typeof direction === 'string' ? setFlex({ direction }) : null}
   ${({ direction }) =>
      direction && direction.desktop ? setFlex({ direction: direction.desktop }) : null}
   ${({ direction }) =>
      direction && direction.tabland
         ? media.tabland(setFlex({ direction: direction.tabland }))
         : null}
   ${({ direction }) =>
      direction && direction.tabport
         ? media.tabport(setFlex({ direction: direction.tabport }))
         : null}
   ${({ direction }) =>
      direction && direction.phone ? media.phone(setFlex({ direction: direction.phone })) : null}
`;
Form.Group = FormGroup;

const INPUT_MODIFIERS = {
   transparent: () => `
        background: none;
        border-bottom: solid .1rem #999;
    `,
   grey: () => `
  &::-webkit-input-placeholder {
    font-weight: 100;
    color: ${colorGrey.light4};
  }
  `,
   outline: () => `
    border: solid .1rem ${colorGrey.light4};
    color: inherit;
  `
};

export const Input = styled.input`
   padding: 1rem;
   font-family: inherit;
   font-size: 1.7rem;
   color: inherit;
   background-color: ${colorGrey.light2};
   border: none;
   border-radius: 0.5rem;
   transition: all 0.25s;
   position: relative;
   &:focus {
      outline: none;
      background-color: ${colorGrey.light3};
   }
   // border-bottom: solid 0.2rem ${colorPrimary.light};
   ${applyStyleModifiers(INPUT_MODIFIERS)}
`;

export const Select = styled.select`
   padding: 1rem;
   font-size: 1.5rem;
   font-weight: 350;
   font-family: inherit;
   border: none;
   background: ${colorGrey.light2};
   &:focus {
      outline: none;
   }
`;

//Form Title
const FormTitle = styled(Title)`
   margin-bottom: 0.5rem;
`;
Form.Title = FormTitle;

//Form Label
const FORMLABEL_MODIFIERS = {
   footer: () => `
      margin-bottom: 0;
      margin-right: 1rem;
    `
};
const FormLabel = styled.label`
   font-size: 1.7rem;
   font-weight: 300;
   margin-bottom: 1rem;
   ${applyStyleModifiers(FORMLABEL_MODIFIERS)}
`;
Form.Label = FormLabel;

//Form Input
const FORMINPUT_MODIFIERS = {
   radio: () => `
    &:focus {
            outline: none;
        }
    `,
   round: () => `
    border-radius: 10rem;
    `,
   transparent: () => `
        background: none;
        border-bottom: solid .1rem #999;
    `
};
const FormInput = styled(Input)`
   ${applyStyleModifiers(FORMINPUT_MODIFIERS)}
`;
Form.Input = FormInput;

//Form Button
const FormButton = styled(Button)``;
Form.Button = FormButton;

//Form Footer
const FormFooter = styled.div`
   ${setFlex({ y: 'center' })}
   margin-top: 1rem;
`;
Form.Footer = FormFooter;

//Form Link
const FormLink = styled(Link)`
   font-size: 1.7rem;
   transition: text-decoration 0.25s;
   &:hover {
      text-decoration: underline;
   }
`;
Form.Link = FormLink;

//Form Radio Group
const FormRadioGroup = styled.div`
   flex-direction: row;
   align-items: center;
`;
Form.RadioGroup = FormRadioGroup;
