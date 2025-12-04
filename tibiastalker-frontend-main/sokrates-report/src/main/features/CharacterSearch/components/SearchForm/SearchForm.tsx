import { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Form, Row, Spinner } from "react-bootstrap";
import usePromptList from "../../hooks/usePromptList";
import { SearchFormProps } from "./types";

export const SearchForm = ({ onSubmit, isLoading, value }: SearchFormProps) => {
  const { promptList, getPromptList, clearPromptList } = usePromptList();

  const [inputValue, setInputValue] = useState(value);
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // proteger contre promptList = undefined
  const safePromptList = Array.isArray(promptList) ? promptList : [];

  const updateInputValue = (newValue: string) => {
    setInputValue(newValue);
    getPromptList(newValue);
  };

  const submit = (valueOverride?: string) => {
    const finalValue = valueOverride ?? inputValue;

    onSubmit(finalValue);
    setInputValue(finalValue);

    setIsFocusOnInput(false);
    clearPromptList();
  };

  const delayedInputBlur = () => {
    timeoutRef.current = setTimeout(() => {
      setIsFocusOnInput(false);
    }, 200);
  };

  const abortInputBlur = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (value !== inputValue) setInputValue(value);
  }, [value]);

  return (
    <Row>
      <Col className="p-1">
        <Form.Control
          type="text"
          placeholder="Character Name"
          value={inputValue}
          data-testid="search-input"
          autoFocus
          onChange={(e) => updateInputValue(e.target.value)}
          onFocus={() => setIsFocusOnInput(true)}
          onBlur={delayedInputBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />

        <Dropdown.Menu
          show={isFocusOnInput && safePromptList.length > 0}
          onFocus={abortInputBlur}
        >
          {safePromptList.map((item) => (
            <Dropdown.Item key={item} onClick={() => submit(item)}>
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
            data-testid="search-button"
            onClick={() => submit()}
          >
            Search
          </Button>
        )}
      </Col>
    </Row>
  );
};
