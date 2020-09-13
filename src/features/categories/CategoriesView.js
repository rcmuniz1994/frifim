import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { EXPENSE_TYPE, INCOME_TYPE } from "./constants";
import LoadingContainer from "../loading/LoadingContainer";
import { categoriesActions } from "./categoriesDuck";

export default function CategoriesView() {
  const dispatch = useDispatch();
  const categoriesState = useSelector((s) => s.categories);

  if (categoriesState.isReadingAll) {
    return <LoadingContainer />
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const creatingCategory = {
      name: event.target.name.value,
      type: event.target.type.value,
      color: '#1277C0',
    };
    dispatch(categoriesActions.create(creatingCategory));

    event.target.reset();
  };

  const handleDelete = (category) => {
    if (window.confirm(`Deletar categoria "${category.name}"?`)) {
      dispatch(categoriesActions.delete(category.uuid));
    }
  }

  return (
    <Container as="main">
      <header>
        <h1>Categorias</h1>
      </header>
      <section>
        <h2>Criar</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formCategoryName">
            <Form.Label column sm={2}>
              Nome:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                placeholder="Etiqueta curta para orçamentos e transações."
                name="name"
                maxLength={25}
                required
              />
            </Col>
          </Form.Group>
          <FlowTypeSelectionFieldset />
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" disabled={categoriesState.isLoading}>
                {categoriesState.isCreating ? 'Adicionando...' : 'Adicionar categoria'}
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </section>
      <section>
        <h2>{INCOME_TYPE.pluralLabel}</h2>
        <CategoriesTable
          items={categoriesState.items.filter(c => c.type === INCOME_TYPE.value)}
          onDelete={handleDelete}
          deleting={categoriesState.deleting}
        />
      </section>
      <section>
        <h2>{EXPENSE_TYPE.pluralLabel}</h2>
        <CategoriesTable
          items={categoriesState.items.filter(c => c.type === EXPENSE_TYPE.value)}
          onDelete={handleDelete}
          deleting={categoriesState.deleting}
        />
      </section>
    </Container>
  );
}

export function FlowTypeSelectionFieldset({ idPrefix='form', defaultValue = null }) {
  return (
    <fieldset>
      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={2}>
          Tipo:
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            type="radio"
            name="type"
            label={INCOME_TYPE.label}
            value={INCOME_TYPE.value}
            id={`${idPrefix}CategoryIncome`}
            defaultChecked={defaultValue === INCOME_TYPE.value}
            required
          />
          <Form.Check
            type="radio"
            name="type"
            label={EXPENSE_TYPE.label}
            value={EXPENSE_TYPE.value}
            id={`${idPrefix}CategoryExpense`}
            defaultChecked={defaultValue === EXPENSE_TYPE.value}
            required
          />
        </Col>
      </Form.Group>
    </fieldset>
  );
}

function CategoriesTable({ items, onDelete, deleting }) {
  if (items.length === 0) {
    return <p>Categorias não encontradas.</p>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cor da etiqueta</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map((category) => (
          <tr key={category.uuid}>
            <td>{category.name}</td>
            <td>
              <span
                className="pl-2 pr-2 pt-1 pb-1 mr-3"
                style={{ backgroundColor: category.color }}
              />{" "}
              {category.color}
            </td>
            <td>
              <Button
                variant="danger"
                onClick={() => onDelete(category)}
                disabled={deleting.includes(category.uuid)}
                size="sm"
              >
                Apagar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
