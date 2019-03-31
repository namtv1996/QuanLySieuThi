<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class frmMain
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.components = New System.ComponentModel.Container()
        Me.grdDetail = New DevExpress.XtraGrid.GridControl()
        Me.bsG9VC = New System.Windows.Forms.BindingSource(Me.components)
        Me.dsG9VC = New MVCTool.DataSetG9VC()
        Me.gdvDetail = New DevExpress.XtraGrid.Views.Grid.GridView()
        Me.colG9VCID = New DevExpress.XtraGrid.Columns.GridColumn()
        Me.colG9Version = New DevExpress.XtraGrid.Columns.GridColumn()
        Me.colSQLText = New DevExpress.XtraGrid.Columns.GridColumn()
        Me.txtSQLText = New DevExpress.XtraEditors.Repository.RepositoryItemMemoExEdit()
        Me.btnSave = New DevExpress.XtraEditors.SimpleButton()
        Me.btnClose = New DevExpress.XtraEditors.SimpleButton()
        Me.btnDelete = New DevExpress.XtraEditors.SimpleButton()
        CType(Me.grdDetail, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.bsG9VC, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.dsG9VC, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.gdvDetail, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.txtSQLText, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'grdDetail
        '
        Me.grdDetail.Anchor = CType((((System.Windows.Forms.AnchorStyles.Top Or System.Windows.Forms.AnchorStyles.Bottom) _
            Or System.Windows.Forms.AnchorStyles.Left) _
            Or System.Windows.Forms.AnchorStyles.Right), System.Windows.Forms.AnchorStyles)
        Me.grdDetail.DataSource = Me.bsG9VC
        Me.grdDetail.Location = New System.Drawing.Point(12, 13)
        Me.grdDetail.MainView = Me.gdvDetail
        Me.grdDetail.Name = "grdDetail"
        Me.grdDetail.RepositoryItems.AddRange(New DevExpress.XtraEditors.Repository.RepositoryItem() {Me.txtSQLText})
        Me.grdDetail.Size = New System.Drawing.Size(708, 383)
        Me.grdDetail.TabIndex = 0
        Me.grdDetail.ViewCollection.AddRange(New DevExpress.XtraGrid.Views.Base.BaseView() {Me.gdvDetail})
        '
        'bsG9VC
        '
        Me.bsG9VC.DataMember = "G9VC"
        Me.bsG9VC.DataSource = Me.dsG9VC
        '
        'dsG9VC
        '
        Me.dsG9VC.DataSetName = "DataSetG9VC"
        Me.dsG9VC.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'gdvDetail
        '
        Me.gdvDetail.Appearance.FixedLine.Options.UseTextOptions = True
        Me.gdvDetail.Appearance.FixedLine.TextOptions.WordWrap = DevExpress.Utils.WordWrap.Wrap
        Me.gdvDetail.Columns.AddRange(New DevExpress.XtraGrid.Columns.GridColumn() {Me.colG9VCID, Me.colG9Version, Me.colSQLText})
        Me.gdvDetail.GridControl = Me.grdDetail
        Me.gdvDetail.Name = "gdvDetail"
        Me.gdvDetail.OptionsBehavior.AutoExpandAllGroups = True
        Me.gdvDetail.OptionsCustomization.AllowRowSizing = True
        Me.gdvDetail.OptionsDetail.AutoZoomDetail = True
        Me.gdvDetail.OptionsDetail.SmartDetailHeight = True
        Me.gdvDetail.OptionsView.RowAutoHeight = True
        Me.gdvDetail.OptionsView.ShowAutoFilterRow = True
        Me.gdvDetail.OptionsView.ShowGroupPanel = False
        '
        'colG9VCID
        '
        Me.colG9VCID.Caption = "Số TT"
        Me.colG9VCID.FieldName = "G9VCID"
        Me.colG9VCID.Name = "colG9VCID"
        Me.colG9VCID.Visible = True
        Me.colG9VCID.VisibleIndex = 0
        Me.colG9VCID.Width = 77
        '
        'colG9Version
        '
        Me.colG9Version.Caption = "Phiên bản"
        Me.colG9Version.FieldName = "G9Version"
        Me.colG9Version.Name = "colG9Version"
        Me.colG9Version.Visible = True
        Me.colG9Version.VisibleIndex = 1
        Me.colG9Version.Width = 114
        '
        'colSQLText
        '
        Me.colSQLText.Caption = "SQL Text"
        Me.colSQLText.ColumnEdit = Me.txtSQLText
        Me.colSQLText.FieldName = "SQLText"
        Me.colSQLText.Name = "colSQLText"
        Me.colSQLText.Visible = True
        Me.colSQLText.VisibleIndex = 2
        Me.colSQLText.Width = 763
        '
        'txtSQLText
        '
        Me.txtSQLText.Buttons.AddRange(New DevExpress.XtraEditors.Controls.EditorButton() {New DevExpress.XtraEditors.Controls.EditorButton(DevExpress.XtraEditors.Controls.ButtonPredefines.Combo)})
        Me.txtSQLText.Name = "txtSQLText"
        Me.txtSQLText.PopupResizeMode = DevExpress.XtraEditors.Controls.ResizeMode.FrameResize
        '
        'btnSave
        '
        Me.btnSave.Anchor = CType((System.Windows.Forms.AnchorStyles.Bottom Or System.Windows.Forms.AnchorStyles.Right), System.Windows.Forms.AnchorStyles)
        Me.btnSave.Location = New System.Drawing.Point(564, 400)
        Me.btnSave.Name = "btnSave"
        Me.btnSave.Size = New System.Drawing.Size(75, 23)
        Me.btnSave.TabIndex = 1
        Me.btnSave.Text = "Cất"
        '
        'btnClose
        '
        Me.btnClose.Anchor = CType((System.Windows.Forms.AnchorStyles.Bottom Or System.Windows.Forms.AnchorStyles.Right), System.Windows.Forms.AnchorStyles)
        Me.btnClose.Location = New System.Drawing.Point(645, 400)
        Me.btnClose.Name = "btnClose"
        Me.btnClose.Size = New System.Drawing.Size(75, 23)
        Me.btnClose.TabIndex = 1
        Me.btnClose.Text = "Đóng"
        '
        'btnDelete
        '
        Me.btnDelete.Anchor = CType((System.Windows.Forms.AnchorStyles.Bottom Or System.Windows.Forms.AnchorStyles.Right), System.Windows.Forms.AnchorStyles)
        Me.btnDelete.Location = New System.Drawing.Point(483, 402)
        Me.btnDelete.Name = "btnDelete"
        Me.btnDelete.Size = New System.Drawing.Size(75, 23)
        Me.btnDelete.TabIndex = 1
        Me.btnDelete.Text = "Xóa dòng"
        '
        'frmMain
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(725, 429)
        Me.Controls.Add(Me.btnClose)
        Me.Controls.Add(Me.btnDelete)
        Me.Controls.Add(Me.btnSave)
        Me.Controls.Add(Me.grdDetail)
        Me.MinimizeBox = False
        Me.Name = "frmMain"
        Me.ShowIcon = False
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "MVC"
        Me.WindowState = System.Windows.Forms.FormWindowState.Maximized
        CType(Me.grdDetail, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.bsG9VC, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.dsG9VC, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.gdvDetail, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.txtSQLText, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub
    Friend WithEvents grdDetail As DevExpress.XtraGrid.GridControl
    Friend WithEvents gdvDetail As DevExpress.XtraGrid.Views.Grid.GridView
    Friend WithEvents bsG9VC As System.Windows.Forms.BindingSource
    Friend WithEvents dsG9VC As MVCTool.DataSetG9VC
    Friend WithEvents colG9VCID As DevExpress.XtraGrid.Columns.GridColumn
    Friend WithEvents colG9Version As DevExpress.XtraGrid.Columns.GridColumn
    Friend WithEvents colSQLText As DevExpress.XtraGrid.Columns.GridColumn
    Friend WithEvents btnSave As DevExpress.XtraEditors.SimpleButton
    Friend WithEvents btnClose As DevExpress.XtraEditors.SimpleButton
    Friend WithEvents txtSQLText As DevExpress.XtraEditors.Repository.RepositoryItemMemoExEdit
    Friend WithEvents btnDelete As DevExpress.XtraEditors.SimpleButton
End Class
