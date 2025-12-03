import { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Form, Row, Spinner } from "react-bootstrap";

import usePromptList from "../../hooks/usePromptList";
import { SearchFormProps } from "./types";

export const SearchForm = ({ onSubmit, isLoading, value }: SearchFormProps) => {
  const { promptList, getPromptList, clearPromptList } = usePromptList();

  // 🔥 Protection anti-crash : garantit TOUJOURS un array
  const safePromptList: string[] = Array.isArray(promptList) ? promptList : [];

  const [inputValue, setInputValue] = useState(value);
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateInputValue = (newValue: string) => {
    setInputValue(newValue);
    getPromptList(newValue);
  };

  const submit = (value?: string) => {
    if (!value) {
      onSubmit(inputValue);
    } else {
      setInputValue(value);
      onSubmit(value);
    }
    setIsFocusOnInput(false);
    clearPromptList();
  };

  const delayedInputBlur = () => {
    timeoutRef.current = setTimeout(() => setIsFocusOnInput(false), 200);
  };

  const abortInputBlurWhenFocusOnPrompt = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (value !== inputValue) setInputValue(value);
  }, [value, inputValue]);

  return (
    <Row>
      <Col className="p-1">
        <Form.Control
          type="text"
          autoFocus
          placeholder="Character Name"
          data-testid="search-input"
          onChange={(event) => updateInputValue(event.target.value)}
          value={inputValue}
          onFocus={() => setIsFocusOnInput(true)}
          onBlur={delayedInputBlur}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
          }}
        />

        <Dropdown.Menu
          show={isFocusOnInput && safePromptList.length > 0}
          onFocus={abortInputBlurWhenFocusOnPrompt}
        >
          {safePromptList.length > 0 &&
            safePromptList.map((item: string) => (
              <Dropdown.Item
                key={item}
                onClick={() => submit(item)}
              >
                {item}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Col>

      <Col xs="auto" className="p-1">
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <Button
            variant="outline-info"
            onClick={() => submit()}
            data-testid="search-button"
          >
            Search
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default SearchForm;
