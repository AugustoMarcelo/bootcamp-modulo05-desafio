import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Filter, Pagination } from './styles';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
        state: 'all',
        pagination: {
            page: 1,
            limit: 5,
        },
    };

    async componentDidMount() {
        const { match } = this.props;
        const { pagination, state } = this.state;
        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state,
                    per_page: 5,
                    page: pagination.page,
                },
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
        });
    }

    loadIssues = async () => {
        const { match } = this.props;

        const { pagination, state } = this.state;

        const repoName = decodeURIComponent(match.params.repository);

        const issues = await api.get(`/repos/${repoName}/issues`, {
            params: {
                state,
                per_page: 5,
                page: pagination.page,
            },
        });

        this.setState({ issues: issues.data });
    };

    handleSelect = async e => {
        const { pagination } = this.state;
        const state = e.target.value;
        await this.setState({ state, pagination: { ...pagination, page: 1 } });
        this.loadIssues();
    };

    handleNextPage = async () => {
        await this.setState(state => ({
            pagination: {
                ...state.pagination,
                page: state.pagination.page + 1,
            },
        }));
        this.loadIssues();
    };

    handlePreviousPage = async () => {
        await this.setState(state => ({
            pagination: {
                ...state.pagination,
                page: state.pagination.page - 1,
            },
        }));
        this.loadIssues();
    };

    render() {
        const { repository, issues, loading, pagination } = this.state;

        if (loading) {
            return <Loading>Carregando</Loading>;
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>
                <Filter>
                    <span>Select a status: </span>
                    <select
                        name="status"
                        id="status"
                        onChange={this.handleSelect}
                    >
                        <option value="all" defaultValue="selected">
                            All
                        </option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </Filter>
                <IssueList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
                <Pagination>
                    <button
                        disabled={pagination.page === 1 && 'disabled'}
                        type="button"
                        onClick={this.handlePreviousPage}
                    >
                        Anterior
                    </button>
                    <button
                        disabled={issues.length === 0 && 'disabled'}
                        type="button"
                        onClick={this.handleNextPage}
                    >
                        Próximo
                    </button>
                </Pagination>
            </Container>
        );
    }
}
