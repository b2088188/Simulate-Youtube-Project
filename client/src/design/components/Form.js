import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { colorGrey, setFlex } from '../utils';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { Span } from '../components/Span';
import { Link } from '../components/Link';

export const Form = styled.form`
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  ${(props) => (props.vertical ? setFlex({ direction: 'column' }) : '')}
  ${(props) => (props.horizontal ? setFlex({ direction: 'row' }) : '')}
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
  `,
};

export const Input = styled.input`
  padding: 1rem;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: ${colorGrey.light2};
  border: none;
  transition: all 0.25s;
  &:focus {
    outline: none;
    background-color: ${colorGrey.light3};
  }
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
    `,
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
    `,
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
