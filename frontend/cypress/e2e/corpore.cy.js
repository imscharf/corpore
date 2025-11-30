describe('Sistema Corpore - Testes E2E', () => {
  
  // Antes de cada teste, acessa a home
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve carregar a Dashboard e alternar para Modo Escuro', () => {
    // Verifica se o título aparece (redirecionamento padrão para cadastro atleta)
    cy.contains('Atletas Cadastrados').should('be.visible');

    // Clica no botão de tema no rodapé da sidebar
    cy.contains('Modo Escuro').click();

    // Verifica se o atributo data-theme mudou no HTML
    cy.get('html').should('have.attr', 'data-theme', 'dark');

    // Volta para claro
    cy.contains('Modo Claro').click();
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });

  it('Deve cadastrar um Novo Atleta com sucesso', () => {
    // 1. Clicar no botão de Novo Atleta
    cy.contains('+ Novo Atleta').click();

    // 2. Verificar se entrou na tela de cadastro
    cy.contains('Novo Atleta').should('be.visible');

    // 3. Preencher formulário (usando os names dos inputs)
    // Usamos um timestamp para garantir CPF e Email únicos a cada teste
    const uniqueId = Date.now();
    
    cy.get('input[name="nome"]').type('Atleta Teste Cypress');
    cy.get('input[name="cpf"]').type(`${uniqueId}`); 
    cy.get('input[name="dataNascimento"]').type('2000-01-01');
    cy.get('select[name="sexo"]').select('Masculino');
    cy.get('input[name="endereco"]').type('Rua dos Testes Automatizados, 123');
    cy.get('input[name="email"]').type(`teste${uniqueId}@corpore.com`);
    
    // Teste da Máscara de Telefone
    cy.get('input[name="telefone"]')
      .type('11999998888')
      .should('have.value', '(11) 99999-8888'); // Verifica se formatou

    cy.get('input[name="peso"]').type('75');
    cy.get('input[name="altura"]').type('1.80');
    
    // 4. Salvar e verificar alerta de sucesso
    // O Cypress captura o window.alert automaticamente
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Atleta cadastrado com sucesso!');
    });

    cy.get('.btn-success').contains('Salvar').click();

    // 5. Verificar redirecionamento para listagem
    cy.contains('Atletas Cadastrados').should('be.visible');
    cy.contains('Atleta Teste Cypress').should('be.visible');
  });

  it('Deve navegar para Exames e testar as Abas', () => {
    // 1. Navegar pelo menu lateral
    cy.get('.sidebar-menu').contains('Exames').click();
    
    // 2. Verificar listagem
    cy.contains('Exames Registrados').should('be.visible');
    
    // 3. Clicar em Novo Exame
    cy.contains('+ Novo Exame').click();
    
    // 4. Verificar se a aba "Dados do Atleta" está ativa por padrão
    cy.get('.tab-item.active').should('contain', 'Dados do Atleta');
    cy.get('input[name="tipoExame"]').should('be.visible'); // Campo da aba 1
    
    // 5. Mudar para aba "Diagnóstico"
    cy.contains('Diagnóstico').click();
    
    // 6. Verificar se mudou o conteúdo
    cy.get('.tab-item.active').should('contain', 'Diagnóstico');
    cy.contains('Laudo Médico').should('be.visible');
    cy.get('textarea[name="resultado"]').should('be.visible'); // Campo da aba 2
    
    // 7. Verificar se o botão de PDF existe
    cy.contains('Visualizar Laudo (PDF)').should('be.visible');
    
    // 8. Voltar para aba anterior
    cy.contains('Dados do Atleta').click();
    cy.get('input[name="tipoExame"]').should('be.visible');
  });
  
  it('Deve validar botão cancelar no formulário', () => {
      cy.visit('/cadastro/atleta/novo');
      cy.get('.btn-danger').contains('Cancelar').click();
      cy.url().should('include', '/cadastro/atleta'); // Deve voltar para a lista
      cy.contains('Atletas Cadastrados').should('be.visible');
  });
});